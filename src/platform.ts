/* eslint-disable no-unused-vars */
import axios from "axios";
import { globals } from "./common";
import * as client from "./client";
import {
  ApiError,
  GetGuildResponse,
  PlatformConnectResponse,
  PlatformGetAllGuilds,
  PlatformGetMembershipsResponse,
  PlatformGetUserMembershipsReponse,
  PlatformJoinResponse,
  PlatformLeaveResponse,
  PlatformStatusResponse,
} from "./types";

const { apiBaseUrl: API_BASE_URL, headers } = globals;

class Platform {
  readonly platformName: string;

  constructor(platformName: string) {
    this.platformName = platformName;
  }

  guild = {
    ...client.guild,

    getAllOfPlatform: async (): Promise<PlatformGetAllGuilds> => {
      const res = await axios.get(
        `${API_BASE_URL}/platform/guild/${this.platformName}`
      );
      return res.data;
    },

    get: async (platformGuildId: string): Promise<GetGuildResponse> => {
      const res = await axios.get(
        `${API_BASE_URL}/platform/guild/${this.platformName}/${platformGuildId}`
      );
      if (res.status === 204) {
        return null;
      }
      return res.data;
    },

    getUserAccess: async (
      platformGuildId: string,
      platformUserId: string
    ): Promise<PlatformStatusResponse> => {
      const res = await axios.get(
        `${API_BASE_URL}/platform/guild/accesses/${this.platformName}/${platformGuildId}/${platformUserId}`
      );
      return res.data;
    },

    getUserMemberships: async (
      platformGuildId: string,
      platformUserId: string
    ): Promise<PlatformGetUserMembershipsReponse> => {
      const res = await axios.get(
        `${API_BASE_URL}/platform/guild/member/${this.platformName}/${platformGuildId}/${platformUserId}`
      );
      return res.data;
    },
  };

  user = {
    ...client.user,

    connect: async (
      platformUserId: string
    ): Promise<PlatformConnectResponse> => {
      try {
        const body = {
          platformUserId,
        };
        const res = await axios.post(
          `${API_BASE_URL}/platform/user/connect`,
          body,
          {
            headers,
          }
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response.data.errors) {
          throw new ApiError(error.response.data.errors);
        } else {
          throw error;
        }
      }
    },

    join: async (
      platformGuildId: string,
      platformUserId: string
    ): Promise<PlatformJoinResponse> => {
      try {
        const body = {
          platformName: this.platformName,
          platformGuildId,
          platformUserId,
        };
        const res = await axios.post(
          `${API_BASE_URL}/platform/user/join`,
          body,
          {
            headers,
          }
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response.data.errors) {
          throw new ApiError(error.response.data.errors);
        } else {
          throw error;
        }
      }
    },

    leave: async (
      platformGuildId: string,
      platformUserId: string
    ): Promise<PlatformLeaveResponse> => {
      try {
        const body = {
          platformName: this.platformName,
          platformGuildId,
          platformUserId,
        };
        const res = await axios.post(
          `${API_BASE_URL}/platform/user/leave`,
          body,
          {
            headers,
          }
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response.data.errors) {
          throw new ApiError(error.response.data.errors);
        } else {
          throw error;
        }
      }
    },

    status: async (
      platformGuildId: string,
      platformUserId: string
    ): Promise<PlatformStatusResponse> => {
      try {
        const body = {
          platformName: this.platformName,
          platformGuildId,
          platformUserId,
        };
        const res = await axios.post(
          `${API_BASE_URL}/platform/user/status`,
          body,
          {
            headers,
          }
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response.data.errors) {
          throw new ApiError(error.response.data.errors);
        } else {
          throw error;
        }
      }
    },

    getMemberships: async (
      platformUserId: string
    ): Promise<PlatformGetMembershipsResponse> => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/platform/user/membership/${this.platformName}/${platformUserId}`
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response.data.errors) {
          throw new ApiError(error.response.data.errors);
        } else {
          throw error;
        }
      }
    },
  };

  role = client.role;
}

// eslint-disable-next-line import/prefer-default-export
export { Platform };
