import { useState } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const routes = [
    { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales'},
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages', badge: true },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];

const themeColors = {
    light: {
        wrapper: '#e2e8f0',
        text: '#000000',
        background: '#ffffff',
        border: '2px solid #eef1f6',
        shadow: '0 0 0 1px #ffffff, 0 0 0 2px #dde3ed, inset 0 0 0 1px #e6ebf3',
        logo: '#ff7500',
        navText: '#455974',
        navIcon: '#8e9db4',
        navTextActive: '#0000b5',
        navBackgroundActive: '#f1f5f9',
        navTextHover: '#06172e',
        navIconHover: '#27364b',
        navBackgroundHover: '#f1f5f9',

    },
    dark: {
        wrapper: '#1e293b',
        text: '#ffffff',
        background: '#000000',
        border: '2px solid #313941',
        shadow: '0 0 0 1px #172136, 0 0 0 2px #172136, inset 0 0 0 1px #20242d',
        logo: '#ffffff',
        navText: '#a2b2c8',
        navIcon: '#677993',
        navTextActive: '#f3faff',
        navBackgroundActive: '#000c45',
        navTextHover: '#eaf5ff',
        navIconHover: '#d7e1ee',
        navBackgroundHover: '#0f172a',
    }
};

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 10px;
    background-color: ${(props) => themeColors[props.theme].wrapper};
    transition: all 0.3s ease-out;
`;

const SidebarNav = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: ${(props) => (props.isOpened ? '200px' : '65px')};
    min-height: calc(100vh - 40px);
    padding: ${(props) => (props.isOpened ? '20px 20px' : '20px 12px')};
    color: ${(props) => themeColors[props.theme].text};
    background-color: ${(props) => themeColors[props.theme].background};
    border: ${(props) => themeColors[props.theme].border};
    border-radius: 12px;
    box-shadow: ${(props) => themeColors[props.theme].shadow};
    transition: all 0.3s ease-out;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    margin-top: 28px;
    margin-bottom: 30px;
    padding: 0 4px;
    font-weight: 700;

    span {
        margin-left: 4px;
        color: ${(props) => themeColors[props.theme].logo};
        opacity: ${(props) => (props.isOpened ? '1' : '0')};
        visibility: ${(props) => (props.isOpened ? 'visible' : 'hidden')};
        transition: all 0.3s ease-out;
    }

    img {
        flex-shrink: 0;
        width: 30px;
        height: auto;
    }
`;

const Toggle = styled.div`
    position: absolute;
    top: 50px;
    right: ${(props) => (props.isOpened ? '-10px' : '-35px')};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    color: ${(props) => themeColors[props.theme].text};
    background-color: ${(props) => (props.isOpened ? themeColors[props.theme].wrapper : themeColors[props.theme].background)};
    transform: ${(props) => (props.isOpened ? 'rotate(-180deg)' : 'rotate(0deg)')};
    transition: all 0.3s ease-out;
    cursor: pointer;
    overflow: hidden;

    svg {
        width: 8px;
        height: auto;
    }
`;

const List = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const NavItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 11px;
    padding: 8px 12px;
    font-weight: 600;
    font-size: 14px;
    color: ${(props) => (props.isActive ? themeColors[props.theme].navTextActive : themeColors[props.theme].navText)};
    background-color: ${(props) => (props.isActive ? themeColors[props.theme].navBackgroundActive : 'transparent')};
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease-out;
    overflow: hidden;

    svg {
        flex-shrink: 0;
        width: 15px;
        height: auto;
        color: ${(props) => (props.isActive ? themeColors[props.theme].navTextActive : themeColors[props.theme].navIcon)};
        transform: translateZ(0);
        transition: all 0.3s ease-out;
    }

    .badge {
        position: absolute;
        left: 24px;
        bottom: calc(50% - 7.5px);
        width: 5px;
        height: 5px;
        background-color: #df3535;
        border: 1px solid #df3535;
        border-color: ${(props) => themeColors[props.theme].background};
        border-radius: 50%;
    }

    span:not(.badge) {
        margin-left: 10px;
        opacity: ${(props) => (props.isOpened ? '1' : '0')};
        visibility: ${(props) => (props.isOpened ? 'visible' : 'hidden')};
        transition: all 0.3s ease-out;
    }

    &:hover {
        color: ${(props) => themeColors[props.theme].navTextHover};
        background-color: ${(props) => themeColors[props.theme].navBackgroundHover};

        svg {
            color: ${(props) => themeColors[props.theme].navIconHover};
        }
    }
`;

const Sidebar = (props) => {
    const { color } = props;
    const [isOpened, setIsOpened] = useState(false);
    const [activePath, setActivePath] = useState('/sales');
    const containerClassnames = classnames('sidebar', { opened: isOpened });

    const goToRoute = (path) => {
        console.log(`going to "${path}"`);
        setActivePath(path);
    };

    const toggleSidebar = () => {
        setIsOpened(v => !v);
    };

    return (
        <Wrapper theme={color}>
            <SidebarNav className={ containerClassnames } isOpened={isOpened} theme={color}>
                <Logo isOpened={isOpened} theme={color}>
                    <img src={ logo } alt="TensorFlow logo"/>
                    <span>TensorFlow</span>
                    <Toggle onClick={ toggleSidebar } isOpened={isOpened} theme={color}>
                        <FontAwesomeIcon icon='angle-right'/>
                    </Toggle>
                </Logo>
                <List>
                    <div>
                        {
                            routes.map(route => (
                                <NavItem
                                    key={ route.title }
                                    onClick={() => {
                                        goToRoute(route.path);
                                    }}
                                    isOpened={isOpened}
                                    theme={color}
                                    isActive={activePath === route.path}
                                >
                                    <FontAwesomeIcon icon={ route.icon }/>
                                    <span>{route.title}</span>
                                    {route.badge && <span className="badge"></span>}
                                </NavItem>
                            ))
                        }
                    </div>
                    <div>
                        {
                            bottomRoutes.map(route => (
                                <NavItem
                                    key={ route.title }
                                    onClick={() => {
                                        goToRoute(route.path);
                                    }}
                                    isOpened={isOpened}
                                    theme={color}
                                    isActive={activePath === route.path}
                                >
                                    <FontAwesomeIcon icon={ route.icon }/>
                                    <span>{ route.title }</span>
                                </NavItem>
                            ))
                        }
                    </div>
                </List>
            </SidebarNav>
        </Wrapper>
    );
};

Sidebar.propTypes = {
    color: PropTypes.string,
};

export default Sidebar;
