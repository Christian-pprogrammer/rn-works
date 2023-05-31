import { getRandomBytesAsync } from 'expo-crypto';

const generatePassword = async () => {
  const length = 10; // Set the desired length of the password

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let characters = uppercase + lowercase + numbers + specialChars;
  let generatedPassword = '';

  try {
    const randomBytes = await getRandomBytesAsync(length);
    for (let i = 0; i < length; i++) {
      generatedPassword += characters[randomBytes[i] % characters.length];
    }

    return generatedPassword;
  } catch (error) {
    console.log(error);
  }
};

export default generatePassword;