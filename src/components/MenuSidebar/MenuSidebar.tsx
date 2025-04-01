import * as MUIcon from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch } from "react";
import { Menu, MenuItem, Sidebar as ReactSidebar } from "react-pro-sidebar";
import { ItemProps, menuItems } from "./store/menuItems";

type Props = {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<React.SetStateAction<boolean>>;
  setOpenUserModal: Dispatch<React.SetStateAction<boolean>>;
};

type SidebarProps = Props & {
  logout: () => Promise<void>;
};

type ItemPropsRender = ItemProps;

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  logout,
  setOpenUserModal,
}: SidebarProps) => {
  const { data } = useSession();
  const { palette } = useTheme();

  const Item = ({ title, to, icon }: ItemPropsRender) => {
    const router = useRouter();
    const pathname = usePathname();
    const absolutePathname =
      "/" + pathname.substring(1, pathname.length).split("/")[0];
    const IconRender = MUIcon[icon];

    const handleChooseItem = () => {
      setIsCollapsed(true);
      router.push(to);
    };

    const renderMenuItem = () => (
      <MenuItem
        active={to == absolutePathname}
        onClick={handleChooseItem}
        icon={<IconRender />}
      >
        <Typography fontWeight={"bold"}>{title}</Typography>
      </MenuItem>
    );

    if (isCollapsed)
      return (
        <Tooltip title={title} placement="right">
          {renderMenuItem()}
        </Tooltip>
      );

    return renderMenuItem();
  };

  return (
    <ReactSidebar
      collapsed={isCollapsed}
      backgroundColor="#f2f0f0"
      className="shadow-md"
    >
      <div className="flex flex-col h-screen justify-between">
        <div>
          <Menu>
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={
                isCollapsed ? (
                  <MUIcon.MenuOutlined color="primary" />
                ) : undefined
              }
              style={{
                margin: "10px 0 20px 0",
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <div
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "11rem",
                    }}
                  >
                    <Typography fontSize={24} color={palette.primary.main}>
                      {data?.user.enterpriseName ?? ""}
                    </Typography>
                  </div>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MUIcon.MenuOutlined color="primary" />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
          </Menu>
          <Menu
            menuItemStyles={{
              button: ({ active }) => {
                return {
                  color: active ? "#FFFF" : palette.primary.main,
                  backgroundColor: active ? palette.primary.main : undefined,
                  transition: "0.2s",
                  "&:hover": {
                    backgroundColor: alpha(
                      palette.primary.main,
                      active ? 1 : 0.1
                    ),
                  },
                };
              },
            }}
          >
            {menuItems.map((e) => (
              <Item key={e.to} title={e.title} to={e.to} icon={e.icon} />
            ))}
          </Menu>
        </div>
        <Menu
          menuItemStyles={{
            button: () => {
              return {
                color: palette.primary.main,
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: alpha(palette.primary.main, 0.1),
                  color: palette.primary.main,
                },
              };
            },
          }}
        >
          <MenuItem
            icon={<Avatar src={data?.user?.photo} />}
            onClick={() => {
              setIsCollapsed(true);
              setOpenUserModal(true);
            }}
          >
            <Typography fontWeight={"bold"}>{data?.user?.login}</Typography>
          </MenuItem>
          <MenuItem icon={<MUIcon.Logout />} onClick={logout}>
            <Typography fontWeight={"bold"}>Sair</Typography>
          </MenuItem>
        </Menu>
      </div>
    </ReactSidebar>
  );
};

export default function MenuSidebar({
  isCollapsed,
  setIsCollapsed,
  setOpenUserModal,
}: Props) {
  const router = useRouter();
  const matchWidth = useMediaQuery("(max-width:768px)");

  const logout = async () => {
    await signOut({ redirect: false });
    router.replace("/login");
  };

  return (
    <div className="flex md:h-screen fixed z-50">
      {matchWidth ? (
        <IconButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ marginTop: "0.8rem" }}
        >
          <MUIcon.MenuOutlined color="primary" />
        </IconButton>
      ) : (
        <Sidebar
          setOpenUserModal={setOpenUserModal}
          isCollapsed={true}
          setIsCollapsed={setIsCollapsed}
          logout={logout}
        />
      )}
      <Drawer open={!isCollapsed} onClose={() => setIsCollapsed(true)}>
        <Sidebar
          setOpenUserModal={setOpenUserModal}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          logout={logout}
        />
      </Drawer>
    </div>
  );
}
