import { useAuthContext } from '@/contexts';
import { NavigationData } from '@/models';
import { getStrapiMedia } from '@/utils';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Logout from '@mui/icons-material/Logout';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export interface IconMenuProps {
  navigation: NavigationData;
}

const settings = [
  {
    label: 'Profile',
    icon: <Avatar sx={{ fontSize: '14px', width: '24px', height: '24px' }} />,
  },
  {
    label: 'Logout',
    icon: <Logout fontSize='small' />,
  },
];
const icons = {
  search: <SearchIcon sx={{ fontSize: 26 }} />,
  person: <PersonOutlineOutlinedIcon sx={{ fontSize: 26 }} />,
  favorite: <FavoriteBorderOutlinedIcon sx={{ fontSize: 26 }} />,
  cart: <ShoppingBagOutlinedIcon sx={{ fontSize: 26 }} />,
} as any;

export function IconMenu({ navigation }: IconMenuProps) {
  const router = useRouter();
  const { user, logout } = useAuthContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (user?.id) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenuItemClick = async (index: number) => {
    if (index === 0) router.push('/account/profile');
    if (index === 1) {
      await logout();
      router.push('/');
    }
    setAnchorElUser(null);
  };

  return (
    <Box
      sx={{
        '& button': { transition: 'all 0.15s linear' },
        '& button:hover': {
          color: 'primary.main',
          transform: 'translateY(-6%)',
          bgcolor: 'unset',
        },
      }}
    >
      {navigation?.rightButton &&
        navigation.rightButton.map((item, index) => (
          <React.Fragment key={index}>
            {isAuthenticated && index === 3 && (
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  alt={user?.username}
                  src={getStrapiMedia(user?.avatar?.url) ?? ''}
                  variant='circular'
                  sx={{
                    height: 36,
                    width: 36,
                    fontSize: '1rem',
                  }}
                />
              </IconButton>
            )}

            {!isAuthenticated && index === 3 && (
              <IconButton
                disableRipple
                sx={{ color: 'text.primary' }}
                onClick={() => router.push(`${item.href}`)}
              >
                {icons[item?.icon ?? '']}
              </IconButton>
            )}

            {index !== 3 && (
              <IconButton
                disableRipple
                sx={{ color: 'text.primary' }}
                onClick={() => router.push(`${item.href}`)}
              >
                {icons[item?.icon ?? '']}
              </IconButton>
            )}
          </React.Fragment>
        ))}

      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting, index) => (
          <MenuItem key={index} onClick={() => handleUserMenuItemClick(index)}>
            <ListItemIcon>{setting.icon}</ListItemIcon>
            <Typography textAlign='center' fontSize='0.875rem'>
              {setting.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
