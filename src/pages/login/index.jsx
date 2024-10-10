import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../service/api";

import { Container, Title, Column, TitleLogin, SubtitleLogin, EsqueciText, CriarText, Row, Wrapper } from './styles';

const schema = yup
  .object({
    email: yup.string().email('email não é válido').required(),
    password: yup.string().min(3, 'No mínimo 3 caracteres').required(),
  })
  .required()

const Login = () => {
    const navigate = useNavigate();

    const {control, handleSubmit, formState: { errors} } = useForm({
        resolver:yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = async (formData ) => {
        try{
            const {data} = await api.get(
                `users?email=${formData.email}&senha=${formData.password}`
            );
            if(data.length === 1){
                navigate("/feed")
            } else {
                alert('Email ou senha inválido')
            }

        }catch{
            alert('Houve um erro, tente novamente.')
        }
    };
    
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
                <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                name="email"
                errorMessage={errors?.email?.message}
                control={control}
                placeholder="E-mail"
                type="mail"
                leftIcon={<MdEmail />}
              />
              <Input
                name="password"
                errorMessage={errors?.password?.message}
                control={control}
                placeholder="Password"
                type="password"
                leftIcon={<MdLock />}
              />
              <Button
                title="Entrar"
                variant="secondary"
                /* onClick={handleClickSignIn} */
                type="submit"
              />
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