import { NextPage } from "next";
 
const IndexPage: NextPage = () => {
  return <div>猫画像予定地</div>;
};
//NextPageはページコンポーネントを表すかた
//これをすると、ページコンポーネントの硫黄権を満たすかチェックできる
export default IndexPage;
//export defaultをページコンポーネントとして認識
//Image型宣言
type Image = {
    url: string;
};

const fetchImage = async (): Promise<Image> => {
    //fetchはHTTPリクエストでリソースを取得する
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    //jsonでパース(オブジェクトになる)
    const images = await res.json();
    console.log(images);
    return images[0];
  };

fetchImage();