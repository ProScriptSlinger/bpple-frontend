export function getNameInitials(fullName) {
  const fullnameArray = fullName.split(" ");

  if (fullnameArray.length >= 2) {
    const firstNameInitial = fullnameArray[0][0];
    const lastNameInitial = fullnameArray[1][0];

    return `${firstNameInitial}`;
  } else {
    return `${fullnameArray[0][0]} `;
  }
}
