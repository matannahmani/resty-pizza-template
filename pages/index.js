import Productbox from '../components/productbox';
import {apigetProduct} from '../lib/pizzaapicontroller';
export default function Home(props) {


  return (
    <>
    <Productbox data={props}/>
    </>
  )
}
export const getStaticProps = async () => {
  // Get external data from the file system, API, DB, etc.
  const data = await apigetProduct();
  return {
    props: {data},
    revalidate: 1, // In seconds

  }
}