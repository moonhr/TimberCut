import { ModelDataType } from "@/ts/types/ModelDataType";

export const importModel = (): ModelDataType[] => {
  try {
    const savedModels = localStorage.getItem("SaveModelData");
    if (!savedModels) {
      return [];
    }
    return JSON.parse(savedModels) as ModelDataType[];
  } catch (error) {
    console.error("모델 불러오기 실패:", error);
    return [];
  }
};
