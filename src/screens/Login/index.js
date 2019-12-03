import React, { useState } from 'react';
import { StatusBar, Platform } from 'react-native';
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

    const [activeMenu, setActiveMenu] = useState('signup');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();

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
                <ActionButton>
                    <ActionText>Entrar</ActionText>
                </ActionButton>
            }

            {activeMenu == 'signup' &&
                <ActionButton>
                    <ActionText>Cadastrar</ActionText>
                </ActionButton>
            }


        </Container>
    );
}

export default Page;