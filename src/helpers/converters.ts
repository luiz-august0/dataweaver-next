import { GridSortItem, GridSortModel } from '@mui/x-data-grid';

export const convertSortModelToString = (sortModel?: GridSortModel): string => {
  if (sortModel && sortModel?.length > 0) {
    let sortedField: GridSortItem = sortModel[0];

    if (!sortedField.field || sortedField.field == '') return '';

    return sortedField.field + ',' + sortedField.sort;
  }

  return '';
};

export const convertUrlToBlob = async (url: string) => {
  const response = await fetch(url, { method: 'GET' });

  return await response.blob();
};

export const convertUrlToReadeableFile = async (url: string) => {
  const file = await convertUrlToBlob(url);

  return new Promise((resolve, reject) => {
    const fr = new FileReader();

    fr.readAsDataURL(file);

    fr.onloadend = function () {
      resolve(fr.result);
    };

    fr.onerror = function (error) {
      reject(error);
    };
  });
};
