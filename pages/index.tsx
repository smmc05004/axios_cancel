import axios from "axios";
/** axios 요청 취소 테스트 0.21.1, 1.5.1*/
// const controller = new AbortController();

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const getUsers = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users", {
      // signal: controller.signal,
      cancelToken: source.token,
    });
    console.log("res: ", res);
    return res.data;
  } catch (error) {
    console.log("error: ", error);
    if (axios.isCancel(error)) {
      console.log("---------취소----------");
      return;
    }

    console.log("----------그 외--------");
  }
};

export default function Home() {
  const handleRequest = async () => {
    console.log("-----------------API 요청-----------------------");
    await getUsers();
  };

  const handleCancel = () => {
    console.log("-------------------취소 요청----------------");
    // controller.abort();
    source.cancel("cancel 이유");
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
