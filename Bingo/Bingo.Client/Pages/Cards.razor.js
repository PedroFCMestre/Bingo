﻿//NOTE: This code was generated by ChatGPT!
export function generateCards(rows, columns, numbersPerColumn, numberOfCards) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Bingo header letters
    const header = ['B', 'I', 'N', 'G', 'O'];

    // New (smaller) dimensions for 4 cards per page
    const margin = 10;            // page margin
    const cellWidth = 18;         // smaller cell width
    const cellHeight = 18;        // smaller cell height
    const cardWidth = columns * cellWidth;      // e.g. 5*20 = 100
    const cardHeight = (rows + 1) * cellHeight;   // header row + grid rows (e.g., (5+1)*20 = 120)
    const gapX = 10;              // horizontal gap between cards
    const gapY = 10;              // vertical gap between cards

    // We want 4 cards per page arranged as 2 columns x 2 rows.
    for (let i = 0; i < numberOfCards; i++) {
        // Every 4 cards, add a new page (except for the first page)
        if (i > 0 && i % 4 === 0) {
            doc.addPage();
        }

        // Compute the card's local index on the current page (0 to 3)
        const localIndex = i % 4;
        // Column index: 0 or 1 (2 cards per row)
        const colIndex = localIndex % 2;
        // Row index: 0 or 1 (2 rows per page)
        const rowIndex = Math.floor(localIndex / 2);

        // Compute starting (x, y) position for the card
        const startX = margin + colIndex * (cardWidth + gapX);
        const startY = margin + rowIndex * (cardHeight + gapY) + 10; // extra top spacing

        // Draw the header row for the card
        for (let col = 0; col < columns; col++) {
            const x = startX + col * cellWidth;
            const y = startY;
            doc.setFontSize(16);
            doc.text(header[col], x + cellWidth / 2, y + cellHeight / 2, { align: 'center' });
        }

        // Array to track used numbers (to ensure uniqueness within a card)
        const usedNumbers = [];

        // Draw the grid cells for the card (rows of numbers)
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                // Check for the middle free space: row index 2 and column index 2 (for a 5x5 card)
                if (rows === 5 && columns === 5 && row === 2 && col === 2) {
                    const x = startX + col * cellWidth;
                    const y = startY + (row + 1) * cellHeight;
                    // Draw the cell rectangle
                    doc.rect(x, y, cellWidth, cellHeight);
                    // Write "FREE" centered in the cell
                    doc.setFontSize(10);
                    doc.text("FREE", x + cellWidth / 2, y + cellHeight / 2, { align: 'center' });
                    continue;  // Skip generating a number for this cell.
                }

                let number = 0;
                // Generate a unique random number for this column.
                while (number === 0 || usedNumbers.includes(number)) {
                    number = Math.floor(Math.random() * numbersPerColumn) + 1 + col * numbersPerColumn;
                }
                usedNumbers.push(number);

                const x = startX + col * cellWidth;
                const y = startY + (row + 1) * cellHeight; // +1 to account for the header row

                // Draw the cell rectangle
                doc.rect(x, y, cellWidth, cellHeight);
                // Write the number centered in the cell
                doc.setFontSize(14);
                doc.text(number.toString(), x + cellWidth / 2, y + cellHeight / 2, { align: 'center' });
            }
        }
    }

    // Save the PDF
    doc.save('bingo-cards.pdf');
}
