import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';


function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrixbb</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
  
  const apiGit = 'https://api.github.com/users/';
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [nameImg, setNameimg] = React.useState('github');
  const [validar, setValidar] = React.useState();
  const [data, setData] = React.useState({ followers: '---', repositories: '---' });
  const [nameTemp, setnameTemp] = React.useState('empty');

  const notFound = () => {
    setData({ followers: '---', repositories: '---' })
    setNameimg('github');
    setValidar(false);
    setnameTemp('Not Found');
}

  const checkImg = (valor) => {

    fetch(`${apiGit}${valor}`)
        .then(async (retorno) => {
            if (retorno.status === 200) {
                let infos = await retorno.json()
                setData({ followers: infos.followers, repositories: infos.public_repos })
                setNameimg(valor);
                setValidar(true);
                setnameTemp(valor);                    
            } else {
                notFound();                    
            }
        })
        .catch(function (err) {
           
            notFound();
        });
}

const validarUsuario = (event) => {
    const valor = event.target.value;
    

    setUsername(valor);
    appConfig.username = valor;

    if (valor.length > 2) {
        checkImg(valor);
    } else {
        setData({ followers: '---', repositories: '---' })
        notFound();
    }}

    const login = (event) => {
      event.preventDefault();

      if (validar) {
          router.push('/chat');
      } else {
          alert('Por favor digite um usuário válido!');
      }

  }

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[0],
           backgroundImage:'url(https://images6.alphacoders.com/749/749388.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          backgroundPosition: 'center',
        }}
      >

        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '8px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          
          <Box
               as="form"
               onSubmit={login}
               styleSheet={{
                   display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                   width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',

               }}
              
          >
            <Titulo tag="h2">Bem vindo!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>
            
            <TextField
            value={username}
            onChange={validarUsuario}
            placeholder='Digite o seu usuário Github...'
            fullWidth
            textFieldColors={{
                neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                },
            }}
            />

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals['fundoDivPrincipal'],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.primary['btnHover'],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`https://github.com/${nameImg}.png`}
                        />
                        <Box
                            styleSheet={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1px',
                                flex: 1,
                            }}
                        >
                            <Text
                                variant="body4"
                                styleSheet={{
                                    color: appConfig.theme.colors.neutrals[200],
                                    backgroundColor: appConfig.theme.colors.neutrals[900],
                                    padding: '1px 10px',
                                    borderRadius: '1000px'
                                }}
                            >
                                usuário: {nameTemp}
                            </Text>
                            <Text
                                variant="body4"
                                styleSheet={{
                                    color: appConfig.theme.colors.neutrals[200],
                                    backgroundColor: appConfig.theme.colors.neutrals[900],
                                    padding: '3px 10px',
                                    borderRadius: '1000px',
                                    marginTop: '8px'
                                }}
                            >
                                seguidores: {data.followers}
                            </Text>
                            <Text
                                variant="body4"
                                styleSheet={{
                                    color: appConfig.theme.colors.neutrals[200],
                                    backgroundColor: appConfig.theme.colors.neutrals[900],
                                    padding: '3px 10px',
                                    borderRadius: '1000px',
                                    marginTop: '8px'
                                }}
                            >
                                repositórios: {data.repositories}
                            </Text>
                        </Box>
                    </Box>
                    {/* Photo Area */}

                </Box>
            </Box>
        </>
    );
}