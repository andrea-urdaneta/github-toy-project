import { serverInstance } from "../api/server";
import { gitHubInstance } from "../api/github";
import parse from "parse-link-header";

const token = localStorage.getItem("accessToken");

const getUsers = async (since = 0) => {
  const response = await gitHubInstance.get(`/users`, {
    params: {
      since,
    },
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${token}`,
    },
  });

  const linkHeader = parse(response.headers.link);

  if (response.data && response.data.length) {
    const updateData = await Promise.all(
      response.data.map(async (user) => {
        const organizationResponse = await getUserOrganizations(user.login);

        return { ...user, organizations: organizationResponse };
      })
    );

    return {
      users: updateData,
      next: linkHeader.next,
    };
  }
};

const searchUsers = async (username, page = 1) => {
  const response = await gitHubInstance.get("/search/users", {
    params: {
      q: username,
      page,
    },
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${token}`,
    },
  });

  if (response.data && response.data.items.length) {
    const updateData = await Promise.all(
      response.data.items.map(async (user) => {
        const organizationResponse = await getUserOrganizations(user.login);

        return { ...user, organizations: organizationResponse };
      })
    );

    return { users: updateData, totalCount: response.data.total_count };
  }

  return { users: [], totalCount: 0 };
};

const getAuthUser = async () => {
  const response = await gitHubInstance.get("/user", {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  return response.data;
};

const followUser = async (username) => {
  const response = await gitHubInstance.put(
    `/user/following/${username}`,
    { username },
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  return response.data;
};

const unfollowUser = async (username) => {
  const response = await gitHubInstance.delete(`/user/following/${username}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  return response.data;
};

const getUserOrganizations = async (username) => {
  try {
    const response = await gitHubInstance.get(`/users/${username}/orgs`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    return response.data;
  } catch (err) {
    return [];
  }
};

const getUserDetail = async (username) => {
  const response = await gitHubInstance.get(`/users/${username}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  return response.data;
};

const checkIfUserIsFollowing = async (username) => {
  try {
    await gitHubInstance.get(`/user/following/${username}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    return true;
  } catch (err) {
    return false;
  }
};

const updateAuthUser = async (userData) => {
  try {
    const response = await gitHubInstance.patch("/user", userData, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    return response.data;
  } catch (err) {
    console.log("Error:", err);
  }
};

export {
  getUsers,
  getAuthUser,
  followUser,
  unfollowUser,
  getUserOrganizations,
  getUserDetail,
  checkIfUserIsFollowing,
  searchUsers,
  updateAuthUser,
};
