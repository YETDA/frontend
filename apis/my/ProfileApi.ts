import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function checkUserEmail(email: string) {
  try {
    const res = await axios.get(`${API_URL}/api/v1/user/check-email`, {
      params: { email },
      withCredentials: true,
    });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 409) {
        return 409;
      }
      console.error("Axios 오류 응답:", err.response);
    } else {
      console.error("알 수 없는 오류:", err);
    }
    throw err;
  }
}

export async function sendVerificationEmail(email: string) {
  try {
    const res = await axios.post(
      `${API_URL}/api/v1/user/send-verification?email=${email}`,
      null,
      {
        withCredentials: true,
      },
    );
    return res.data;
  } catch (err) {
    console.error("이메일 인증 요청 실패:", err);
    throw err;
  }
}

export async function sendVerificationResult(
  email: string,
  verificationCode: string,
) {
  try {
    const res = await axios.post(`${API_URL}/api/v1/user/verify-code`, null, {
      params: {
        email,
        code: verificationCode,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("이메일 인증 요청 실패:", err);
    throw err;
  }
}

export async function getUserAccount() {
  try {
    const res = await axios.get(`${API_URL}/api/v1/user/mypage/account`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("이메일 인증 요청 실패:", err);
    throw err;
  }
}

export async function updateUserAccount(bank: string, account: string) {
  try {
    const res = await axios.put(
      `${API_URL}/api/v1/user/mypage/account`,
      { bank, account },
      {
        withCredentials: true,
      },
    );
    return res.data;
  } catch (err) {
    console.error("이메일 인증 요청 실패:", err);
    throw err;
  }
}

export async function deleteUserAccount() {
  try {
    const res = await axios.delete(`${API_URL}/api/v1/user/mypage/account`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("이메일 인증 요청 실패:", err);
    throw err;
  }
}

export async function logout() {
  try {
    const res = await axios.post(`${API_URL}/api/v1/user/logout`, null, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("로그아웃 요청 실패:", err);
    throw err;
  }
}

export async function createUserFollow(followingId: number) {
  try {
    const res = await axios.post(
      `${API_URL}/api/v1/follow/${followingId}`,
      null,
      {
        withCredentials: true,
      },
    );
    return res.data;
  } catch (err) {
    console.error("팔로우 요청 실패:", err);
    throw err;
  }
}

export async function deleteUserFollow(followingId: number) {
  try {
    const res = await axios.delete(`${API_URL}/api/v1/follow/${followingId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("언팔로우 요청 실패:", err);
    throw err;
  }
}
