import { GetStaticPaths, GetStaticProps, GetServerSideProps } from 'next';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  imgUrl: string;
};

interface Props {
  product: Product;
};

// // 어떤 정적 페이지를 만들어야 하는지 정의하는 함수
// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch('https://learn.codeit.kr/api/codeitmall/products/');
//   const data = await res.json();
//   const products = data.results as Product[];

//   const paths = products.map((product) => {
//     return { params: { id: product.id.toString() } }
//   });

//   console.log(paths);

//   // return 1-9 path 반환
//   // => 1~9번까지의 페이지를 미리 생성
//   return {
//     paths,
//     // fallback: false, // 404 없는 페이지입니다.
//     // fallback: true, // 로딩중입니다..
//     fallback: 'blocking', // 흰 화면으로 보여주거나, 이전 페이지에서 로딩
//   }
// }

// // 정적 페이지를 생성할 때 property들을 가져오고, 정의하는 함수
// export const getStaticPorps: GetStaticProps<Props> = async (context) => {
//   // params에 id가 있는지 없는지 확실하지 않기 때문에 ? 로 productId에 대해 optional 처리
//   const productId = context.params?.['id'];

//   if (!productId) {
//     return {
//       notFound: true
//     }
//   }

//   let product: Product;
  
//   try {
//     const  res = await fetch(`https://learn.codeit.kr/api/codeitmall/products/${productId}`);
//     product = await res.json() as Product;
//   } catch (e) {
//     console.error(e);

//     return {
//       notFound: true
//     }
//   }
 
//   return {
//     props: {
//       product
//     }
//   }
// }

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const productId = context.params?.['id'];

  if (!productId) {
    return {
      notFound: true
    }
  }

  let product: Product;
  
  try {
    const  res = await fetch(`https://learn.codeit.kr/api/codeitmall/products/${productId}`);
    product = await res.json() as Product;
  } catch (e) {
    console.error(e);

    return {
      notFound: true
    }
  }
 
  return {
    props: {
      product
    }
  }
}

// 렌더링 함수
const Product = ({ product }: Props) => {
  return (
    <div>
        <h1>Product Page: {product.name}</h1>
        <Image 
          src={product.imgUrl} 
          alt={product.name} 
          width={300} height={300} />
    </div>
  );
}

export default Product;