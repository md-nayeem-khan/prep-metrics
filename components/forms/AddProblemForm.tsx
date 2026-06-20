"use client";

import { useEffect, useState } from "react";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchableMultiSelect } from "@/components/forms/SearchableMultiSelect";
import { toast } from "sonner";

interface AddProblemFormProps {
  onSuccess?: () => void;
}

interface CompanyOption {
  id: number;
  name: string;
}

const difficultyOptions = ["Easy", "Medium", "Hard"];

const platformOptions = [
  "LeetCode",
  "HackerRank",
  "CodeForces",
  "AtCoder",
  "GeeksforGeeks",
  "Other",
];

const fallbackPatterns = [
  "Two Pointers", "Sliding Window", "Binary Search", "Dynamic Programming",
  "Greedy", "Backtracking", "Depth-First Search", "Breadth-First Search",
  "Hash Table", "Array", "String", "Stack", "Queue", "Heap", "Tree", "Graph",
  "Linked List", "Trie", "Union Find", "Bit Manipulation"
];

const fallbackTags = [
  "Array", "String", "Hash Map", "Binary Search", "Dynamic Programming",
  "Greedy", "Backtracking", "Graph", "Tree", "Heap", "Stack", "Queue",
  "Linked List", "Math", "Bit Manipulation",
];

export function AddProblemForm({ onSuccess }: AddProblemFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patternOptions, setPatternOptions] = useState<{ id: number; name: string }[]>([]);
  const [companyOptions, setCompanyOptions] = useState<CompanyOption[]>([]);
  const [tagOptions, setTagOptions] = useState<string[]>(fallbackTags);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [] as string[],
    difficulty: "",
    patterns: [] as string[],
    companyIds: [] as string[],
    platform: "",
    url: "",
    problemId: "",
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [patternsResponse, companiesResponse, filtersResponse] = await Promise.all([
          fetch("/api/patterns"),
          fetch("/api/companies"),
          fetch("/api/problems/filters"),
        ]);

        if (patternsResponse.ok) {
          const patternsPayload = await patternsResponse.json();
          const rawPatterns = Array.isArray(patternsPayload?.patterns)
            ? patternsPayload.patterns
            : [];

          const parsedPatterns = rawPatterns
            .filter((value: unknown) => {
              return (
                typeof value === "object" &&
                value !== null &&
                Number.isInteger((value as { id?: unknown }).id) &&
                typeof (value as { name?: unknown }).name === "string"
              );
            })
            .map((value: { id: number; name: string }) => ({
              id: value.id,
              name: value.name,
            }));

          setPatternOptions(parsedPatterns);
        }

        let companiesFromApi: CompanyOption[] = [];
        if (companiesResponse.ok) {
          const companiesPayload = await companiesResponse.json();
          const rawCompanies = Array.isArray(companiesPayload?.companies)
            ? companiesPayload.companies
            : [];

          companiesFromApi = rawCompanies
            .filter((value: unknown) => {
              return (
                typeof value === "object" &&
                value !== null &&
                Number.isInteger((value as { id?: unknown }).id) &&
                typeof (value as { name?: unknown }).name === "string"
              );
            })
            .map((value: { id: number; name: string }) => ({
              id: value.id,
              name: value.name,
            }));
        }

        let tagsFromApi: string[] = [];
        if (filtersResponse.ok) {
          const data = await filtersResponse.json();
          tagsFromApi = Array.isArray(data?.tags)
            ? data.tags.filter((value: unknown) => typeof value === "string")
            : [];
        }

        if (companiesFromApi.length > 0) setCompanyOptions(companiesFromApi);
        if (tagsFromApi.length > 0) setTagOptions(tagsFromApi);
      } catch {
        setPatternOptions([]);
        setCompanyOptions([]);
        setTagOptions(fallbackTags);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.difficulty) {
      toast.error("Required fields missing", {
        description: "Please fill in the problem title and difficulty",
      });
      return;
    }

    setLoading(true);

    try {
      const selectedPatternIds = patternOptions
        .filter((pattern) => formData.patterns.includes(pattern.name))
        .map((pattern) => pattern.id);
      const selectedCompanyIds = formData.companyIds
        .map((value) => Number(value))
        .filter((value) => Number.isInteger(value) && value > 0);

      const response = await fetch("/api/problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          difficulty: formData.difficulty,
          patterns: selectedPatternIds,
          companyIds: selectedCompanyIds,
          platform: formData.platform,
          url: formData.url,
          problemId: formData.problemId,
          tags: formData.tags,
          source: selectedCompanyIds.length > 0 ? "Company" : "NeetCode",
        }),
      });

      if (!response.ok) throw new Error("Failed to add problem");

      toast.success("Problem added successfully!", {
        description: `${formData.title} is ready for tracking`,
      });

      setOpen(false);
      setFormData({
        title: "", description: "", tags: [], difficulty: "",
        patterns: [], companyIds: [], platform: "", url: "", problemId: ""
      });
      onSuccess?.();
    } catch {
      toast.error("Failed to add problem", {
        description: "Please check your connection and try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Problem
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Problem</DialogTitle>
          <DialogDescription>
            Add a new coding problem with difficulty, patterns, company associations, and tags.
          </DialogDescription>
        </DialogHeader>

        <form id="add-problem-form" onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Row 1: Problem Title & Problem ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Problem Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Two Sum"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="problemId">Problem ID *</Label>
              <Input
                id="problemId"
                value={formData.problemId}
                onChange={(e) => setFormData(prev => ({ ...prev, problemId: e.target.value }))}
                placeholder="e.g., 1, 20, 146"
                className="font-mono"
                required
              />
            </div>
          </div>

          {/* Row 2: Platform & Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Platform *</Label>
              <Select
                value={formData.platform}
                onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose platform" />
                </SelectTrigger>
                <SelectContent>
                  {platformOptions.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Difficulty *</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyOptions.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Algorithm Pattern & Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Algorithm Pattern</Label>
              <SearchableMultiSelect
                options={(patternOptions.length > 0
                  ? patternOptions.map((p) => ({ value: p.name, label: p.name }))
                  : fallbackPatterns.map((p) => ({ value: p, label: p })))}
                selectedValues={formData.patterns}
                onChange={(values) => setFormData((prev) => ({ ...prev, patterns: values }))}
                placeholder="Choose algorithm patterns"
                searchPlaceholder="Search patterns..."
              />
            </div>

            <div className="space-y-2">
              <Label>Company Association</Label>
              <SearchableMultiSelect
                options={companyOptions.map((c) => ({
                  value: String(c.id),
                  label: c.name,
                }))}
                selectedValues={formData.companyIds}
                onChange={(values) => setFormData((prev) => ({ ...prev, companyIds: values }))}
                placeholder="Select target companies"
                searchPlaceholder="Search companies..."
              />
            </div>
          </div>

          {/* Row 4: Tags & URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tags</Label>
              <SearchableMultiSelect
                options={tagOptions.map((tag) => ({ value: tag, label: tag }))}
                selectedValues={formData.tags}
                onChange={(values) => setFormData((prev) => ({ ...prev, tags: values }))}
                placeholder="Choose tags"
                searchPlaceholder="Search tags..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Problem URL *</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://leetcode.com/problems/two-sum/"
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="description">Notes & Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Add any notes, approach hints, or problem insights..."
              className="min-h-[80px] resize-none"
              rows={3}
            />
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-problem-form"
            disabled={loading || !formData.title || !formData.difficulty}
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Adding...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Add Problem
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
