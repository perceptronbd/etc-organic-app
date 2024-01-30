import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useProductOptions = () => {
  const productsData = useSelector((state) => state.product.products);

  const [productOptions, setProductOptions] = useState({
    "Select Product": [{ value: "Select Product", label: "Select Product" }],
  });

  useEffect(() => {
    const options = productsData.reduce((acc, product) => {
      const { category } = product;
      if (acc[category]) {
        acc[category].push({ value: product._id, label: product.productName });
      } else {
        acc[category] = [{ value: product._id, label: product.productName }];
      }
      return acc;
    }, {});

    setProductOptions((prevOptions) => ({ ...prevOptions, ...options }));
  }, [productsData]);

  return { productOptions };
};
