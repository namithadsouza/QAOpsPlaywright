const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = readExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output = { row: rowNumber, column: colNumber };
            }
        });
    });
    return output;
}

//update Mango Price to 350. 

test('Upload download excel validation', async ({ page }) => {
    const textSearch = 'Mango';
    const updateValue = '350';
    //filter the row by the search text
    const desiredRow = page.getByRole('row').filter({ has: page.getByText(textSearch) });

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    const downloadPromise = page.waitForEvent('download');
    //await page.locator('#downloadButton').click();
    await page.getByRole('button', { name: 'Download' }).click();
    await page.waitForTimeout(5000); // 5 seconds to download file
    const download = await downloadPromise;
    const filePath = await download.path();
    console.log("filename is " + filePath)

    console.log("before change " + await desiredRow.locator('#cell-4-undefined').textContent());
    // Ensure the edit finishes before upload
    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);

    await page.locator('#fileinput').setInputFiles(filePath);
    //verify it has the updated value

    console.log("before change " + await desiredRow.locator('#cell-4-undefined').textContent());
    console.log("After change " + desiredRow.locator('#cell-4-undefined').textContent());

    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});
