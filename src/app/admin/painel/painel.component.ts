import { Component } from '@angular/core';
import { Subscriber } from 'src/app/common/subscriber';
import { Tester } from 'src/app/common/tester';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent {
  testers: Tester[] = [];
  subscribers: Subscriber[] = [];
  componenteSelecionado: 'testers' | 'subscribers' = 'testers';

  selecionarComponente(componente: 'testers' | 'subscribers'): void {
    this.componenteSelecionado = componente;
  }
}
// Vende-se lindos filhotes de lulu da pomerânia com pedigree
// Vende-se 2 filhotes machos da raça spits alemão.
// Vai com a primeira vacina, vermifugado e com pedigree;
// Nascidos no dia 5 de novembro de 2023;
// Pai da cor caramelo - 3 anos.
// Mãe da cor branco neve - 2 anos.
// (Não somos canil)
// Dividimos no cartão.

// Dúvidas e mais fotos pelo whatsapp.
// (31) 971417100
