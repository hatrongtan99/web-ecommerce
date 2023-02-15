import classNames from "classnames/bind";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useQuery, useMutation } from "@tanstack/react-query";
import styles from "./categories.module.scss";
import { ToastContainer } from "react-toastify";

import { createNewCategory, getAllCategory } from "~api/categories.api";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import { NewCategory } from "~types/categories.type";
import Spinner from "~components/common/spiner/Spiner";
import { useState } from "react";

const cx = classNames.bind(styles);

const Categories = () => {
  const axiosPrivate = useAxiosPrivate();
  const { data, isLoading } = useQuery(["all-category"], getAllCategory);
  const mutaion = useMutation((data: NewCategory) =>
    createNewCategory(axiosPrivate, data)
  );
  const handleCreateNewCate = async (values: NewCategory) => {
    mutaion.mutateAsync(values);
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container-fluid">
          <div className={cx("form-create")}></div>

          <div className={cx("list")}>
            {data?.lists.map((item, index) => (
              <CateItem data={item} key={item._id} />
            ))}
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

const CateItem = ({ data }: any) => {
  const [active, setActive] = useState(false);
  return <div className={cx("list-item")}></div>;
};

export default Categories;
