import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import GrainIcon from "@mui/icons-material/Grain";
import { styled } from "@mui/material/styles";
import { Skeleton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useContext } from "react";
import { LoadingBarRef } from "../../App";

const CustomizedLink = styled(Link)`
  color: #84a7bb;
  text-decoration: none;

  @media screen and (min-width: 560px) {
    cursor: pointer;
  }

  :hover {
    color: #84a7bb;
    text-decoration: underline;
  }
`;

export default function IconBreadcrumbs({ path, name }) {
  const splitPath = path.pathname.split("/");
  const ref = useContext(LoadingBarRef);

  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ color: "white" }}
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <CustomizedLink
          onClick={() => ref.current.continuousStart()}
          underline="hover"
          sx={{
            display: "flex",
            alignItems: "center",
            "@media (max-width:600px)": {
              fontSize: "13px", // سایز فونت در موبایل
            },
          }}
          to="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </CustomizedLink>
        <CustomizedLink
          onClick={() => ref.current.continuousStart()}
          underline="hover"
          sx={{
            display: "flex",
            alignItems: "center",
            "@media (max-width:600px)": {
              fontSize: "13px", // سایز فونت در موبایل
            },
          }}
          to={`/${splitPath[1]}`}
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {splitPath[1]}
        </CustomizedLink>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            "@media (max-width:600px)": {
              fontSize: "13px", // سایز فونت در موبایل
            },
          }}
        >
          <MonetizationOnOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {name !== undefined ? (
            name
          ) : (
            <Skeleton
              variant="rounded"
              width={60}
              height={15}
              sx={{ bgcolor: "grey.900" }}
            />
          )}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
