export interface Transaction {
    id: number;
    montant: number;
    status: string;
    date: string;
    solde_sender: number;
    solde_receiver: number;
    frais: number;
    type: string;
    senderId: number;
    receiverId: number;
    receiverString: string | null;
  }

//interface banklist

  export interface Bank {
    id: number;
    nom_bank: string;
    photo: string;
 
  }
  