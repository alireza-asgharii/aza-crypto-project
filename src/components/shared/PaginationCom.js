import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styles from "../../styles/pagination.module.scss";
import { PaginationItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";


const PaginationCom = ({ page }) => {
  
  const location = useLocation();
  const query = queryString.parse(location.search);
  document.documentElement.scrollTop = 1;

  const [nPage, setNPage] = useState(+query.page)

  useEffect(() => {
      setNPage(+query.page)
  }, [query.page])


  return (
    <Stack
      className={styles.stack}
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Pagination
        page={nPage || 1}
        count={page}
        color="primary"
        shape="rounded"
        className={styles.pagination}
        renderItem={(item) => (
          <PaginationItem
            className={styles.paginationItem}
            component={Link}
            to={`/${item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

export default PaginationCom;
