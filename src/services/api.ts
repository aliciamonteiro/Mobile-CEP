import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://viacep.com.br/ws/', // URL base da API ViaCEP
});

export default Api;
