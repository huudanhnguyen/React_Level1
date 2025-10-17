import { useState } from "react";
import BookForm from "../components/book/book.form";
import BookTable from "../components/book/book.table";

const BooksPage = () => {
  const [newBook, setNewBook] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  const handleBookCreated = (book) => {
    setNewBook(book); // ✅ Thêm user mới vào đầu danh sách
    setReloadCount((prev) => prev + 1); // ✅ Reload lại danh sách từ API
  };

  return (
    <div style={{ padding: "20px" }}>
      <BookForm onBookCreated={handleBookCreated} />
      <BookTable
        newBook={newBook}
        triggerReload={reloadCount}
        onBookCreated={handleBookCreated}
      />
    </div>
  );
};

export default BooksPage;
