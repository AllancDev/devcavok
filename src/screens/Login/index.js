import React, {useState} from 'react';
import {StatusBar, Platform, ActivityIndicator} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';

import useDevsCavokApi from '../../useDevsCavokApi';
import {
    Container,
    Header,
    HeaderTitle,
    Menu,
    MenuItem,
    MenuItemText,
    Input,
    ActionButton,
    ActionText,
    LoadingArea,
} from './style';

const Page = props => {
    const api = useDevsCavokApi();
    const [activeMenu, setActiveMenu] = useState('signin');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        if (email && password) {
            setLoading(true);

            const res = await api.signin(email, password);
            setLoading(false);
            if (res.error) {
                alert(res.error);
            } else {
                props.setToken(res.token);

                props.navigation.dispatch(
                    StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'HomeDrawer',
                            }),
                        ],
                    }),
                );
            }
        }
    };

    const handleSignUp = async () => {
        if (name && email && password) {
            setLoading(true);
            const res = await api.signup(name, email, password);
            setLoading(false);
            if (res.error) {
                alert(res.error);
            } else {
                props.setToken(res.token);
                props.navigation.dispatch(
                    StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'HomeDrawer',
                            }),
                        ],
                    }),
                );
            }
        }
    };
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <StatusBar barStyle="light-content" backgroundColor="#2d353c" />
            <Header>
                <HeaderTitle>EFB - CAVOK</HeaderTitle>
            </Header>

            <Menu>
                <MenuItem
                    active={activeMenu === 'signin'}
                    onPress={() => setActiveMenu('signin')}
                    underlayColor="transparent">
                    <MenuItemText>Login</MenuItemText>
                </MenuItem>

                <MenuItem
                    active={activeMenu === 'signup'}
                    onPress={() => setActiveMenu('signup')}
                    underlayColor="transparent">
                    <MenuItemText>Cadastrar</MenuItemText>
                </MenuItem>
            </Menu>

            {activeMenu == 'signup' && (
                <Input
                    placeholder="Nome"
                    value={name}
                    onChangeText={t => setName(t)}
                    placeholderTextColor="#999"
                    editable={!loading}
                />
            )}

            <Input
                placeholder="E-mail"
                value={email}
                onChangeText={t => setEmail(t)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
                editable={!loading}
            />
            <Input
                placeholder="Senha"
                value={password}
                onChangeText={t => setPassword(t)}
                placeholderTextColor="#999"
                secureTextEntry={true}
                editable={!loading}
            />

            {activeMenu == 'signin' && (
                <ActionButton editable={!loading} onPress={handleSignIn}>
                    <ActionText>Entrar</ActionText>
                </ActionButton>
            )}

            {activeMenu == 'signup' && (
                <ActionButton editable={!loading} onPress={handleSignUp}>
                    <ActionText>Cadastrar</ActionText>
                </ActionButton>
            )}

            {loading && (
                <LoadingArea>
                    <ActivityIndicator size="large" color="#fff" />
                </LoadingArea>
            )}
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        token: state.userReducer.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setToken: token => dispatch({type: 'SET_TOKEN', payload: {token}}),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Page);
