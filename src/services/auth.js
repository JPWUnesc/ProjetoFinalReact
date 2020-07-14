export const TOKEN_KEY = "@financee-token";
const TIME = 86400;
const CONVERSOR_NUMBER = 1000;
export const isAuthenticated = () => getWithExpiry() !== null;
export const getToken = () => getWithExpiry();
export const login = token => {
  setWithExpiry(token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

function setWithExpiry(value) {
  const now = new Date()
  
	const item = {
		value: value,
		expiry: now.getTime() / CONVERSOR_NUMBER
	}
	localStorage.setItem(TOKEN_KEY, JSON.stringify(item))
}

function getWithExpiry() {
	const itemStr = localStorage.getItem(TOKEN_KEY)
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	if (((now.getTime() / CONVERSOR_NUMBER) - TIME) > item.expiry) {
		localStorage.removeItem(TOKEN_KEY)
		return null
	}
	return item.value
}