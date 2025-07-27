export const createDonationProject = async (formData: FormData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/project/donation`,
      {
        method: "POST",
        credentials: "include", // 쿠키 포함 (HttpOnly accessToken/refreshToken용)
        headers: {
          //  Content-Type은 FormData일 경우 자동으로 설정되므로 명시 X
          Accept: "application/json",
        },
        body: formData,
      },
    );

    if (!response.ok) {
      // 401일 경우 특별히 처리해도 좋음
      const errorJson = await response.json().catch(() => ({}));
      const errorMessage =
        errorJson?.message || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("후원형 프로젝트 등록 실패:", error);
    throw error;
  }
};
