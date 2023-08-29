import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
 
const IndexPage: NextPage = () => {
    // ❶ useStateを使って状態を定義する
    const [imageUrl, setImageUrl] = useState("");//画像のURLが挿入される
    const [loading, setLoading] = useState(true);//ロード中かどうか
    // ❷ マウント時に画像を読み込む宣言
    useEffect(() => {
      fetchImage().then((newImage) => {
        setImageUrl(newImage.url); // 画像URLの状態を更新する
        setLoading(false); // ローディング状態を更新する
      });
    }, []);//コンポーネントがマウントされた時のみ実行

    const handleClick = async () => {
        setLoading(true); // 読込中フラグを立てる
        const newImage = await fetchImage();
        setImageUrl(newImage.url); // 画像URLの状態を更新する
        setLoading(false); // 読込中フラグを倒す
      };
      return (
        <div className={styles.page}>
          <button onClick={handleClick} className={styles.button}>
            他のにゃんこも見る
          </button>
          <div className={styles.frame}>
            {loading || <img src={imageUrl} className={styles.img} />}
          </div>
        </div>
      );

    // ❸ ローディング中でなければ、画像を表示する
    return <div>{loading || <img src={imageUrl} />}</div>;
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