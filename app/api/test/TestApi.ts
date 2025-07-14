import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob24yZ0BleGFtcGxlLmNvbSIsInVzZXJJZCI6MSwidXNlcm5hbWUiOiLquYDsnKDsoIAiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1MjQyNTExMSwiZXhwIjoxNzUyNDM1OTExfQ.l5oG9Sb1E1Ku9O3-Fe5acOas5geEtdhgHInb-U68gKo";

export const CreatePurchaseInfo = async () => {
  try {
    const response = await axios.post(
      `${API}/api/v1/order/purchase`,
      {
        projectId: 1,
        projectType: "PURCHASE",
        customerEmail: "test@naver.com",
        purchaseOptions: [1],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating purchase info:", error);
    throw error;
  }
};

export const TossPurchaseApi = async (paymentKey: string, orderId: string) => {
  const response = await axios.post(`${API}/api/v1/toss/confirm`, {
    paymentKey,
    orderId,
    amount: 1,
  });
  return response.data;
};
