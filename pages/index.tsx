import axios from "axios";

const controller = new AbortController();

const getUsers = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    });
    console.log("res: ", res);
    return res.data;
  } catch (error) {
    console.log("error: ", error);
    if (axios.isCancel(error)) {
      console.log("---------취소----------");
      return;
    }

    console.log("----------에러--------");
  }
};

export default function Home() {
  const handleRequest = async () => {
    console.log("-----------------API 요청-----------------------");
    await getUsers();
  };

  const handleCancel = () => {
    console.log("-------------------취소 요청----------------");
    controller.abort();
    console.log("-------------------취소 완료----------------");
  };

  return (
    <div>
      <button type="button" onClick={handleRequest}>
        요청
      </button>
      <button type="button" onClick={handleCancel}>
        취소
      </button>
    </div>
  );
}
