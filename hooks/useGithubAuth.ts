interface User {
  name: string;
  email: string;
  image: string;
}

const handleGithubAuth = async (user: User) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/github`, {
      method: "POST",
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to authenticate with GitHub");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Failed to authenticate with GitHub");
  }
};

export default handleGithubAuth;
