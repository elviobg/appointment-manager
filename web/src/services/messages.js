const MESSAGES = {}

const ERROR = {}
ERROR.INVALID_EMAIL = 'E-mail inválido.'
ERROR.INVALID_LOGIN = 'E-mail ou senha inválidos.'
ERROR.MISSING_FIELDS_REGISTER = 'Preencha todos os dados para se cadastrar.'
ERROR.MISSING_FIELDS_LOGIN = 'Preencha e-mail e senha para continuar!'
ERROR.SIGN_UP = 'Ocorreu um erro ao registrar sua conta.'
MESSAGES.ERROR = ERROR

const LABEL = {}
LABEL.EMAIL = 'E-mail'
LABEL.FIRSTNAME = 'Nome'
LABEL.LASTNAME = 'Sobrenome'
LABEL.PASSWORD = 'Senha'
MESSAGES.LABEL = LABEL

const SIGNIN = {}
SIGNIN.LOGIN = 'Login'
SIGNIN.LINK_SIGUP = 'Não tem conta ainda? Criar conta'
MESSAGES.SIGNIN = SIGNIN

const SIGNUP = {}
SIGNUP.CREATE_ACCOUNT = 'Criar conta'
SIGNUP.LINK_SIGIN = 'Já tem uma conta? Faça login'
MESSAGES.SIGNUP = SIGNUP

export default MESSAGES
