import { useState } from "react";
import BookForm from "../components/book/book.form";
import BookTable from "../components/book/book.table";

const BooksPage = () => {
  const [newBook, setNewBook] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  // 🧩 Gọi khi tạo mới
  const handleBookCreated = (book) => {
    setNewBook(book);
    setReloadCount((prev) => prev + 1);
  };

  // 🧩 Gọi khi cập nhật
  const handleBookUpdated = (book) => {
    setReloadCount((prev) => prev + 1); // ✅ Tăng biến đếm để trigger reload
  };

  return (
    <div style={{ padding: "20px" }}>
      <BookForm onBookCreated={handleBookCreated} />
      <BookTable
        newBook={newBook}
        triggerReload={reloadCount}
        onBookCreated={handleBookCreated}
        onBookUpdated={handleBookUpdated} // ✅ thêm dòng này
      />
    </div>
  );
};

export default BooksPage;
