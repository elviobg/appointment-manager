const MESSAGES = {}

const BUTTONS = {}
BUTTONS.CREATE = 'Criar'
BUTTONS.CREATE_PACIENT = 'Criar paciente'
BUTTONS.DELETE = 'Excluir'
BUTTONS.EDIT = 'Editar'
BUTTONS.NEW_APPOINTMENT = 'Nova Consulta'
MESSAGES.BUTTONS = BUTTONS

const ERROR = {}
ERROR.DB_CONNECTION = 'Não foi possivel realizar a operação, tente novamente.'
ERROR.INVALID_EMAIL = 'E-mail inválido.'
ERROR.INVALID_LOGIN = 'E-mail ou senha inválidos.'
ERROR.MISSING_FIELDS_REGISTER = 'Preencha todos os dados para se cadastrar.'
ERROR.MISSING_FIELDS_LOGIN = 'Preencha e-mail e senha para continuar!'
ERROR.SIGN_UP = 'Ocorreu um erro ao registrar sua conta.'
MESSAGES.ERROR = ERROR

const FEEDBACK = {}
FEEDBACK.LOADING = 'Carregando... aguarde por favor...'
MESSAGES.FEEDBACK = FEEDBACK

const LABEL = {}
LABEL.APPOINTMENTS = 'Consultas'
LABEL.BIRTHDAY = 'Data de aniversário'
LABEL.DATE = 'Data'
LABEL.EMAIL = 'E-mail'
LABEL.FIRSTNAME = 'Nome'
LABEL.GENDER = 'Sexo'
LABEL.HEIGHT = 'Altura'
LABEL.LASTNAME = 'Sobrenome'
LABEL.OBSERVATION = 'Nota'
LABEL.PASSWORD = 'Senha'
LABEL.PATIENT = 'Paciente'
LABEL.PHONE = 'Telefone'
LABEL.WEIGHT = 'Peso'
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
