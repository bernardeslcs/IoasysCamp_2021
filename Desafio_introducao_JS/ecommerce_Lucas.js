// Desafio para prática, JavaScript

class CarrinhoDeCompra{
    constructor(cliente, data){
        this.arrayDeProtutos=[];
        this.ehNovoCliente = cliente;
        this.dataCompra = data;
        this.cupom = null;
        this.valorTotal=0;
    }

    adicionarProduto(produto, quantidade) {
        this.arrayDeProtutos.push([produto,quantidade]);
    } 
    
    adicionarProdutos(listaDeProdutos){
        this.arrayDeProtutos.push(...listaDeProdutos);
    }

    adicionarCupom(cupom){
        this.cupom = cupom;
    }

    produtosDoCarrinho(){
        return this.arrayDeProtutos;
    }

    qntidaDeProdutos(){
        let qnt = 0;
        for(let i=0;i<this.arrayDeProtutos.length;i++){
            qnt += this.arrayDeProtutos[i][1];
        }
        return qnt;
    }
    
    calculaDesconto(){
        let valorDesconto = 0;
        if(this.ehNovoCliente){
            valorDesconto = 0.20;
        }else if(this.cupom){
            switch(cupom){
                case "CAMP10":
                    valorDesconto = 0.10;
                    break;
                case "CAMP20":
                    valorDesconto = 0.20;
                    break;
                case "CAMP30":
                    valorDesconto = 0.30;
                    break;
            }
        }else{
            if(this.valorSemDesconto() >= 100){
                valorDesconto = 0.05;
            }else{
                valorDesconto = 0;
            }
        }
        return valorDesconto;
    }

    valorSemDesconto(){
        let valorCompra = 0;
        for(let i = 0; i<this.arrayDeProtutos.length; i++){
            valorCompra += this.arrayDeProtutos[i][0].precoProd*this.arrayDeProtutos[i][1];
        }
        return valorCompra;
    }

    valorComDesconto(){
        let desc = this.calculaDesconto();
        let valSemDes = this.valorSemDesconto();
        if(desc){
            return valSemDes - (valSemDes*desc);
        }else{
            return valSemDes; 
        }
    }

    imprimeProdutos(){
        for(let i =0; i< this.arrayDeProtutos.length;i++ ){
            console.log("("+this.arrayDeProtutos[i][1]+"x)"+this.arrayDeProtutos[i][0].nomeProd + " R$ "+ 
                (this.arrayDeProtutos[i][0].precoProd *this.arrayDeProtutos[i][1]));
        }
        console.log("Numero de itens: " + (this.qntidaDeProdutos()));
    }
}

function Produto(nome,preco){
    this.nomeProd = nome;
    this.precoProd = preco;
}

function FinalizarCompra(carrinhoDeCompras, parcelas, metodoPag){
        console.log("Data: " + meuCarrinho.dataCompra + "\nItens: ");
        ExbirResumoDaCompra(carrinhoDeCompras);
        CalculaParcelas(carrinhoDeCompras,parcelas,metodoPag);
}

function CalculaParcelas(meuCarrinho,n,metodoPag){
    let parcela = meuCarrinho.valorComDesconto() / n;
    console.log("Parcelado em " + n + " vezes de R$ " +parcela+ "\nPagamento com : "+ metodoPag);
}

function ExbirResumoDaCompra(meuCarrinho){
    meuCarrinho.imprimeProdutos();

    console.log("Valor Total da Compra: R$ " + meuCarrinho.valorSemDesconto());
    console.log("Valor do desconto: " + meuCarrinho.calculaDesconto()*meuCarrinho.valorSemDesconto());
    console.log("Valor Da Compra com Desconto: R$ " + meuCarrinho.valorComDesconto());

}





let meuCarrinho = new CarrinhoDeCompra(true, "21/02/2021");
let azeitona = new Produto("azeitona", 1.99);
let limao = new Produto("limao", 50);
let acerola = new Produto("acerola", 8.99);
let abacaxi = new Produto("abacaxi", 4.80);
let maça = new Produto("maça", 7.99);
let pera = new Produto("pera", 10);



//meuCarrinho.adicionarProduto(limao,2);
let listaDeProdutos = [[limao,2], [azeitona,3],[acerola,1],[abacaxi,2],[maça,3],[pera,4]];
meuCarrinho.adicionarProdutos(listaDeProdutos);
FinalizarCompra(meuCarrinho,2,"Cartao Credito");