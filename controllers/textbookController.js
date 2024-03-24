const DbLogic = require("./DbLogic.js");
const db = new DbLogic();

exports.searchTextbookByISBN = async (req, res) => {
  try {
    const resourceISBN = req.body.resourceISBN.replaceAll('-', '').trim();
    const textbooks = await db.getTextbookByISBN(resourceISBN);
    if (textbooks) {
      return res.json(textbooks);
    } else {
      // No DB textbook entry found, check API
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${resourceISBN}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`);
      const jsonData = await response.json();
      if (jsonData["totalItems"] === 0 || jsonData.length === 0) return res.status(404).send('Book not found');
      const textbookData = jsonData.items[0]["volumeInfo"];

      // If API responds with entry, add to DB
      await saveTextbook(textbookData, resourceISBN);
      return res.json(textbookData);
    }

  } catch (error) {
    return res.status(400);
  }
}

const saveTextbook = async (volumeData, ISBN_13) => {

  try {
    const newTextbookEntry = {
      ISBN_13: ISBN_13,
      title: volumeData.title,
      authors: volumeData.authors,
      description: volumeData.description,
      publisher: volumeData.publisher,
      publishedDate: volumeData.publishedDate,
      categories: volumeData.categories,
      language: volumeData.language,
      thumbnail: volumeData["imageLinks"]["thumbnail"],
    }

    return await db.saveTextbook(newTextbookEntry);
  } catch (error) {
    console.error(error)

  }


}
