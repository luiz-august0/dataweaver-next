import { getDigits } from '@/helpers/general';
import { validateBr } from 'js-brasil';
import * as yup from 'yup';
import { pt } from 'yup-locale-pt';

const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

yup.addMethod(yup.string, 'isValidCpfCnpj', function () {
  return this.test('isValidCpfCnpj', function (value) {
    if (value && getDigits(value).length > 11) {
      return validateBr.cnpj(value);
    } else if (value && getDigits(value).length <= 11) {
      return validateBr.cpf(value);
    } else if (value) {
      return false;
    }

    return true;
  });
});

yup.addMethod(yup.string, 'isValidCep', function () {
  return this.test('isValidCep', function (value) {
    if (value) {
      return validateBr.cep(getDigits(value));
    }

    return true;
  });
});

yup.addMethod(yup.string, 'isValidUrl', function () {
  return this.test('isValidUrl', function (value) {
    if (value) {
      return validateBr.site(value);
    }

    return true;
  });
});

yup.addMethod(yup.string, 'isValidPhone', function () {
  return this.test('isValidPhone', function (value) {
    if (value && getDigits(value).length > 10) {
      return validateBr.celular(getDigits(value));
    } else if (value && getDigits(value).length <= 10) {
      return validateBr.telefone(getDigits(value));
    }

    return true;
  });
});

yup.addMethod(yup.string, 'isValidEmail', function () {
  return this.test('isValidEmail', function (value) {
    if (value) {
      return emailRegex.test(value) ? true : false;
    }

    return true;
  });
});

yup.setLocale(pt);

export default yup;
