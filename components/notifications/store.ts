import { create } from 'zustand';
import type { NotificationStatus, NotificationAction } from '@/components/ui/notification-card';

export type Notification = {
  id: string;
  title: string;
  body: string;
  status: NotificationStatus;
  createdAt: string;
  actions?: NotificationAction[];
};

type NotificationState = {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'status'>) => void;
  unreadCount: () => number;
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Daily streak at risk!',
    body: "You haven't solved a problem today. Keep your streak alive with even one problem.",
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    actions: [
      { id: 'view-problems', label: 'Solve a problem', type: 'redirect', style: 'primary' },
    ],
  },
  {
    id: '2',
    title: '3 problems due for revision',
    body: 'Binary Search, Sliding Window, and Merge Sort are scheduled for review today.',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    actions: [
      { id: 'view-revision', label: 'Start revision', type: 'redirect', style: 'primary' },
    ],
  },
  {
    id: '3',
    title: 'Pattern strength improved!',
    body: 'Your Two Pointers pattern proficiency jumped from 60% to 78% this week.',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    actions: [
      { id: 'view-patterns', label: 'View patterns', type: 'redirect', style: 'primary' },
    ],
  },
  {
    id: '4',
    title: 'Mock interview scheduled',
    body: 'You have a timed mock interview session starting in 1 hour. Make sure you\'re ready.',
    status: 'read',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    actions: [
      { id: 'view-mock', label: 'View mock', type: 'redirect', style: 'primary' },
    ],
  },
  {
    id: '5',
    title: 'Weekly goal reached!',
    body: 'You solved 15 problems this week, hitting your target. Great consistency!',
    status: 'read',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    actions: [
      { id: 'view-goals', label: 'View goals', type: 'redirect', style: 'primary' },
    ],
  },
];

export const useNotificationStore = create<NotificationState>()((set, get) => ({
  notifications: mockNotifications,

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, status: 'read' as const } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, status: 'read' as const })),
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [{ ...notification, status: 'unread' as const }, ...state.notifications],
    })),

  unreadCount: () => get().notifications.filter((n) => n.status === 'unread').length,
}));
