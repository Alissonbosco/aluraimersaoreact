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
  const gitURL = 'https://github.com/';
  const apiGithub = 'https://api.github.com/users/';


  // Fazer com que o usuário seja variável ao digitar no textField
  const [username, setUsername] = React.useState('')
  // const para armazenar a imagem do user
  const [userImg, setUserImg] = React.useState(`${gitURL}github.png`)
  // const para nome abaixo da foto
  const [nameImg, setNameImg] = React.useState('GitHub')
  // usar nas rotas das pags
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[0],
           backgroundImage:'url(https://images6.alphacoders.com/749/749388.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
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
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          
          <Box
              as="form"
              onSubmit={function (infosDoEvento) {
                infosDoEvento.preventDefault();
                console.log('Alguém submeteu o form');
                roteamento.push('/chat');
              }}
            
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
            placeholder='Insira o seu Usuario do GitHub...'
            value={username}
            onChange={function (event) {
              console.log('usuario digitou', event.target.value);
              // Onde ta o valor?
              const valor = event.target.value;
              // Trocar o valor da variavel
              // através do React e avise quem precisa
              setUsername(valor);
               // validar se existe o usuário e pegar a sua foto
               fetch(`${apiGithub}${valor}`, {method: 'GET'}).then(
                (retorno) => {
                    // se existir vai pegar a foto e por o nome no username
                    if(retorno.status === 200){
                        console.log('user existe 200')
                        // Trocar o valor da username
                        setUsername(valor);
                        setNameImg(valor)
                        // Trocar o valor do userImg
                        setUserImg(`${gitURL}${valor}.png`)
                    }else if(retorno.status === 404){
                        setNameImg('User não existe')
                        setUserImg(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4tBbzVZlIvgshAFiNpeCsuFW-UE3dZpnIxQ&usqp=CAU`)
                    }
                }
            )
            
            }}
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
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
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
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000gipx'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
