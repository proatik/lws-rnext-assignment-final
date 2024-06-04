"use client";

const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);

    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Failed to set value", error);
  }
};

const getItem = (key) => {
  try {
    const serializedValue = localStorage.getItem(key);

    if (serializedValue === null) {
      return null;
    }

    return JSON.parse(serializedValue);
  } catch (error) {
    console.error("Failed to get value", error);
    return null;
  }
};

const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove value", error);
  }
};

export default { getItem, setItem, removeItem };
