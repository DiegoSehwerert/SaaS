import styles from "./page.module.css";
import { getHello } from "./actions/getHello";




export default async function Home() {
  const helloMessage = await getHello();
  return (
    <div className={styles.page}>
      <p>{helloMessage.message}</p>
    </div>
  );
}
