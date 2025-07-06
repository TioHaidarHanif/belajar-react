// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleNotes {
    // Struktur data untuk catatan
    struct Note {
        uint256 id;
        string content;
        bool exists; // Menandakan apakah catatan ini ada (belum dihapus)
    }

    // Mapping untuk menyimpan catatan berdasarkan ID
    mapping(uint256 => Note) public notes;
    uint256 public nextId; // Untuk menghasilkan ID catatan unik

    // Event yang akan dipancarkan saat operasi CRUD terjadi
    event NoteAdded(uint256 id, string content, address indexed owner);
    event NoteUpdated(uint256 id, string content, address indexed owner);
    event NoteDeleted(uint256 id, address indexed owner);

    constructor() {
        nextId = 0; // Mulai ID dari 0
    }

    // Fungsi untuk membuat catatan baru
    function addNote(string calldata _content) public returns (uint256) {
        require(bytes(_content).length > 0, "Content cannot be empty");

        uint256 id = nextId;
        notes[id] = Note(id, _content, true); // Buat catatan baru
        nextId++; // Naikkan ID untuk catatan berikutnya

        emit NoteAdded(id, _content, msg.sender);
        return id;
    }

    // Fungsi untuk membaca satu catatan berdasarkan ID
    function getNote(uint256 _id) public view returns (uint256 id, string memory content, bool exists) {
        Note storage note = notes[_id];
        return (note.id, note.content, note.exists);
    }

    // Fungsi untuk mendapatkan semua catatan (ini tidak efisien untuk jumlah besar di dunia nyata)
    // Untuk demo sederhana, kita asumsikan jumlah catatan kecil.
    // Di aplikasi nyata, Anda akan menggunakan event atau subgraph untuk membaca semua data.
    function getAllNotes() public view returns (Note[] memory) {
        Note[] memory allNotes = new Note[](nextId);
        uint256 counter = 0;
        for (uint256 i = 0; i < nextId; i++) {
            if (notes[i].exists) {
                allNotes[counter] = notes[i];
                counter++;
            }
        }
        // Buat array baru dengan ukuran yang tepat
        Note[] memory filteredNotes = new Note[](counter);
        for (uint256 i = 0; i < counter; i++) {
            filteredNotes[i] = allNotes[i];
        }
        return filteredNotes;
    }

    // Fungsi untuk memperbarui catatan yang sudah ada
    function updateNote(uint256 _id, string calldata _newContent) public {
        require(notes[_id].exists, "Note does not exist");
        require(bytes(_newContent).length > 0, "Content cannot be empty");

        notes[_id].content = _newContent;
        emit NoteUpdated(_id, _newContent, msg.sender);
    }

    // Fungsi untuk menghapus catatan (secara logis, bukan menghapus data dari blockchain)
    function deleteNote(uint256 _id) public {
        require(notes[_id].exists, "Note does not exist");

        notes[_id].exists = false; // Tandai sebagai tidak ada
        // Untuk benar-benar menghapus data dan menghemat gas (jarang dilakukan karena rumit):
        // delete notes[_id];
        emit NoteDeleted(_id, msg.sender);
    }
}