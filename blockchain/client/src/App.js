import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import SimpleNotesArtifact from './SimpleNotes.json'; // ABI contract

// =====================================================================
// PENTING: GANTI DENGAN ALAMAT CONTRACT SimpleNotes YANG ANDA DAPATKAN!
const contractAddress = "xxx";
// =====================================================================

// =====================================================================
// PENTING: GANTI DENGAN PRIVATE KEY DARI AKUN PERTAMA HARDHAT NODE ANDA (misal: Account #0)
// JANGAN PERNAH MENGGUNAKAN INI DI PRODUKSI!
const localPrivateKey = "xxx";
// =====================================================================

function App() {
  const [currentAccount, setCurrentAccount] = useState(null); // Ini akan menjadi akun dari private key lokal
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteContent, setNewEditNoteContent] = useState(''); // Perbaikan nama state

  useEffect(() => {
    // Panggil fungsi setupContract secara langsung saat komponen dimuat
    setupLocalContract();
  }, []);

  useEffect(() => {
    if (contract) {
      fetchAllNotes();
    }
  }, [contract]);

  // Fungsi ini menggantikan checkIfWalletIsConnected dan connectWallet
  const setupLocalContract = async () => {
    try {
      // Inisialisasi Provider untuk jaringan lokal Hardhat
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

      // Buat Wallet (signer) dari private key lokal
      // PENTING: Ini hanya untuk pengembangan lokal. JANGAN DIGUNAKAN DI PRODUKSI.
      const signer = new ethers.Wallet(localPrivateKey, provider);
      
      // Dapatkan alamat dari signer untuk ditampilkan
      const address = await signer.getAddress();
      setCurrentAccount(address);
      console.log("Terhubung ke akun lokal:", address);

      // Inisialisasi contract dengan signer lokal
      const simpleNotesContract = new ethers.Contract(contractAddress, SimpleNotesArtifact.abi, signer);
      setContract(simpleNotesContract);
      console.log("Contract SimpleNotes diinisialisasi dengan akun lokal.");

    } catch (error) {
      console.error("Gagal menginisialisasi contract lokal:", error);
      setError("Gagal menginisialisasi contract lokal. Pastikan Hardhat Node berjalan.");
    }
  };

  // --- CRUD Operations ---

  // READ All Notes
  const fetchAllNotes = async () => {
    if (!contract) return;
    setError(null);
    try {
      const fetchedNotes = await contract.getAllNotes();
      const validNotes = fetchedNotes.filter(note => note.exists);
      const formattedNotes = validNotes.map(note => ({
        id: Number(note.id),
        content: note.content,
        exists: note.exists
      }));
      setNotes(formattedNotes);
      console.log("Catatan diambil:", formattedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Gagal mengambil catatan.");
    }
  };

  // CREATE Note
  const addNote = async () => {
    if (!contract || !newNoteContent) {
      setError("Konten catatan tidak boleh kosong.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const tx = await contract.addNote(newNoteContent);
      await tx.wait();
      console.log("Catatan ditambahkan!");
      setNewNoteContent('');
      await fetchAllNotes();
    } catch (error) {
      console.error("Error adding note:", error);
      setError("Gagal menambahkan catatan. Pastikan Hardhat Node berjalan.");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE Note
  const handleUpdateNote = async (id) => {
    if (!contract || !editNoteContent) {
      setError("Konten catatan tidak boleh kosong.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const tx = await contract.updateNote(id, editNoteContent);
      await tx.wait();
      console.log("Catatan diperbarui!");
      setEditNoteId(null);
      setNewEditNoteContent(''); // Perbaikan nama state
      await fetchAllNotes();
    } catch (error) {
      console.error("Error updating note:", error);
      setError("Gagal memperbarui catatan. Pastikan Hardhat Node berjalan.");
    } finally {
      setLoading(false);
    }
  };

  // DELETE Note
  const handleDeleteNote = async (id) => {
    if (!contract) return;
    setLoading(true);
    setError(null);
    try {
      const tx = await contract.deleteNote(id);
      await tx.wait();
      console.log("Catatan dihapus!");
      await fetchAllNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("Gagal menghapus catatan. Pastikan Hardhat Node berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Aplikasi Catatan Web3 (Lokal Saja)</h1>

      {/* Tidak ada tombol "Hubungkan Metamask" lagi, karena sudah otomatis terhubung ke akun lokal */}
      {currentAccount ? (
        <div>
          <p>Terhubung ke Akun Lokal: <span style={styles.address}>{currentAccount}</span></p>

          {/* CREATE Section */}
          <div style={styles.section}>
            <h2>Tambah Catatan Baru</h2>
            <input
              type="text"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Isi catatan baru..."
              style={styles.input}
              disabled={loading}
            />
            <button onClick={addNote} disabled={loading} style={styles.button}>
              {loading ? 'Menambahkan...' : 'Tambah Catatan'}
            </button>
          </div>

          {/* READ Section */}
          <div style={styles.section}>
            <h2>Daftar Catatan</h2>
            {notes.length === 0 ? (
              <p>Tidak ada catatan.</p>
            ) : (
              <ul style={styles.noteList}>
                {notes.map((note) => (
                  <li key={note.id} style={styles.noteItem}>
                    {editNoteId === note.id ? (
                      <>
                        <input
                          type="text"
                          value={editNoteContent}
                          onChange={(e) => setNewEditNoteContent(e.target.value)} // Perbaikan nama state
                          style={styles.input}
                          disabled={loading}
                        />
                        <button onClick={() => handleUpdateNote(note.id)} disabled={loading} style={styles.buttonSmall}>
                          {loading ? 'Memperbarui...' : 'Simpan'}
                        </button>
                        <button onClick={() => setEditNoteId(null)} style={{ ...styles.buttonSmall, backgroundColor: '#6c757d' }}>
                          Batal
                        </button>
                      </>
                    ) : (
                      <>
                        <span>ID: {note.id} | Konten: {note.content}</span>
                        <div style={styles.noteActions}>
                          <button
                            onClick={() => { setEditNoteId(note.id); setNewEditNoteContent(note.content); }} // Perbaikan nama state
                            style={{ ...styles.buttonSmall, backgroundColor: '#ffc107', color: '#333' }}
                          >
                            Edit
                          </button>
                          <button onClick={() => handleDeleteNote(note.id)} disabled={loading} style={{ ...styles.buttonSmall, backgroundColor: '#dc3545' }}>
                            Hapus
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <p>Menghubungkan ke blockchain lokal...</p> // Pesan saat aplikasi sedang mencoba terhubung
      )}

      {error && <p style={styles.errorText}>Error: {error}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f4f7f6',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  address: {
    fontWeight: 'bold',
    wordBreak: 'break-all',
  },
  button: {
    padding: '10px 20px',
    margin: '10px 0',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  buttonSmall: {
    padding: '5px 10px',
    marginLeft: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  input: {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: 'calc(100% - 140px)',
    boxSizing: 'border-box',
  },
  section: {
    marginTop: '30px',
    padding: '20px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
  },
  noteList: {
    listStyleType: 'none',
    padding: 0,
  },
  noteItem: {
    backgroundColor: '#e9ecef',
    padding: '10px 15px',
    margin: '10px 0',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  noteActions: {
    marginTop: '5px',
  },
  errorText: {
    color: 'red',
    marginTop: '20px',
    fontWeight: 'bold',
  },
};

export default App;