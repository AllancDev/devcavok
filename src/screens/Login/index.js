import React, { useState } from 'react';
import { StatusBar, Platform } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

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
    ActionText
}
    from './style';

const Page = () => {

    const api = useDevsCavokApi;
    const [activeMenu, setActiveMenu] = useState('signup');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        if(email && password) {
            const res = await api.signin(email, password);
            if(res.error) {
                alert(res.error);
            } else {
                // 1. Guardar o token no reducer
                 

                // 2. redirecionar para o home
            }
            
        }
    }

    const handleSignUp = () => {

    }

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : null} >
            <StatusBar barStyle="light-content" />
            <Header>
                <HeaderTitle>Cavok</HeaderTitle>
            </Header>

            <Menu>
                <MenuItem active={activeMenu == 'signin'} onPress={() => setActiveMenu('signin')} underlayColor="transparent" >
                    <MenuItemText>Login</MenuItemText>
                </MenuItem>

                <MenuItem active={activeMenu == 'signup'} onPress={() => setActiveMenu('signup')} underlayColor="transparent" >
                    <MenuItemText>Cadastrar</MenuItemText>
                </MenuItem>
            </Menu>

            {activeMenu == 'signup' &&
                <Input placeholder="Nome" value={name} onChangeText={e => setName(t)} placeholderTextColor="#999" />
            }


            <Input placeholder="E-mail" value={email} onChangeText={t => setEmail(t)} keyboardType="email-address" autoCapitalize="none" placeholderTextColor="#999" />
            <Input placeholder="Senha" value={password} onChangeText={t => setPassword(t)} placeholderTextColor="#999" />

            {activeMenu == 'signin' &&
                <ActionButton onPress = { handleSignIn } >
                    <ActionText>Entrar</ActionText>
                </ActionButton>
            }

            {activeMenu == 'signup' &&
                <ActionButton onPress = { handleSignUp}>
                    <ActionText>Cadastrar</ActionText>
                </ActionButton>
            }


        </Container>
    );
}

const mapStateToProps = ( state ) => {
    return {
        token: state.userReducer.token
    };
}

const mapDispatchToProps = ( dispatch) => {
    return {
        setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: { token }})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Page);
