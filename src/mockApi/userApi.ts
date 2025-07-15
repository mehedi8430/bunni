/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TUser } from "@/types";
import { simulateApiResponse } from ".";

const mockUsers: TUser[] = [
  {
    id: "USER-000001-1",
    memberName: "David Johnson",
    email: "tim.jennings@example.com",
    phone: "(+33) 00 55 57 60",
    permissions: "Owner",
    lastLogin: "Pending Invitation",
  },
  {
    id: "USER-000001-2",
    memberName: "Emily Carter",
    email: "alex.smith@example.com",
    phone: "(+33) 6 55 53 80 10",
    permissions: "Admin",
    lastLogin: "Jun 28, 2025, 6:03 AM",
  },
  {
    id: "USER-000001-3",
    memberName: "Michael Smith",
    email: "julianna.brown@example.com",
    phone: "(+33) 7 00 55 57 99",
    permissions: "Admin",
    lastLogin: "Jun 28, 2025, 2:03 PM",
  },
  {
    id: "USER-000001-4",
    memberName: "Sarah Thompson",
    email: "michael.johnson@example.com",
    phone: "(+33) 6 55 53 55 63",
    permissions: "Admin",
    lastLogin: "Jun 28, 2025, 2:03 PM",
  },
  {
    id: "USER-000001-5",
    memberName: "Jessica Lee",
    email: "sophia.williams@example.com",
    phone: "(+33) 7 45 55 87 71",
    permissions: "Admin",
    lastLogin: "Jun 28, 2025, 2:03 PM",
  },
  {
    id: "USER-000001-6",
    memberName: "Matthew Brown",
    email: "david.miller@example.com",
    phone: "(+33) 6 55 56 53 33",
    permissions: "Admin",
    lastLogin: "Jun 28, 2025, 2:03 PM",
  },
  {
    id: "USER-000001-7",
    memberName: "Olivia Wilson",
    email: "emily.davis@example.com",
    phone: "(+33) 7 75 55 63 33",
    permissions: "Admin",
    lastLogin: "Jun 28, 2025, 2:03 PM",
  },
  {
    id: "USER-000001-8",
    memberName: "James Garcia",
    email: "chris.jones@example.com",
    phone: "(+33) 7 55 55 49 84",
    permissions: "Admin",
    lastLogin: "Jun 28, 2025, 2:03 PM",
  },
  {
    id: "USER-000001-9",
    memberName: "James Garcia",
    email: "linda.garcia@example.com",
    phone: "(+33) 7 55 55 49 84",
    permissions: "Admin",
    lastLogin: "Jun 28, 2025, 2:03 PM",
  },
];

export const userApi = {
  /**
   * Simulates fetching a list of users with pagination.
   * @param {object} params - Filters and pagination parameters
   * @returns {Promise<{ data: TUser[], total: number }>}
   */
  getUsers: async ({
    search,
    page = 1,
    limit = 10,
  }: {
    search?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{ data: TUser[]; total: number }> => {
    let filteredUsers: TUser[] = [...mockUsers];

    // Apply search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.memberName.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.phone.toLowerCase().includes(searchTerm) ||
          user.permissions.toLowerCase().includes(searchTerm) ||
          user.lastLogin.toLowerCase().includes(searchTerm),
      );
    }

    // Calculate pagination
    const total = filteredUsers.length;
    const startIndex = (page - 1) * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

    return simulateApiResponse({ data: paginatedUsers, total });
  },

  /**
   * Simulates fetching a single user by id.
   * @param {string} id
   * @returns {Promise<User>}
   */
  getUserById: async (id: string): Promise<TUser> => {
    const user = mockUsers.find((user) => user.id === id);
    if (user) {
      return simulateApiResponse(user);
    }
    return simulateApiResponse(null as any, 500, false);
  },
};
