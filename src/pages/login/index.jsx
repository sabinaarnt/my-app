import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, Title, Column, TitleLogin, SubtitleLogin, EsqueciText, CriarText, Row, Wrapper } from './styles';

const schema = yup
  .object({
    email: yup.string().email('email não é válido').required(),
    password: yup.string().min(3, 'No mínimo 3 caracteres').required(),
  })
  .required()

const Login = () => {
    const navigate = useNavigate();

    const handleClickSignIn = () => {
        navigate('/feed')
    }
    
    const {control, handleSubmit, formState: { errors, isValid }} = useForm({
        resolver:yupResolver(schema),
    });

    const onSubmit = (data) => console.log(data)
    
    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Faça seu cadastro</TitleLogin>
                <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Input control={control} placeholder="E-mail" leftIcon={<MdEmail />} name="email" />
                    
                    <Input control={control} type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha"  />
                    
                    <Button title="Entrar" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <EsqueciText>Esqueci minha senha</EsqueciText>
                    <CriarText>Criar Conta</CriarText>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Login }