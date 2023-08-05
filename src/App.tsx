import React from 'react';
import logo from './logo.svg';
import './App.css';
import Data from "./data.json"

//jsonの型推論ができる
type USERS = typeof Data;

//TypeScriptは自動で型推論してくれる。
//明示的に型を指定すること(アノテーション)ができる。
let username: string = 'hello!';
let name = 'john';
let num = 1;

//以下配列は要素にnumberとstringを持つ
let array = [0, 1, "hi"];


//オブジェクトの型定義. オブジェクト作成時はinterfaceを使う
//オブジェクトのキーに?をつけることで型の制限を緩めることができる
interface NAME {
  first: string;
  last: string | null;
}

let nameObj: NAME = {first: 'YAMADA', last: null}

//関数の返り値の型を明示したい場合は、引数の後に":型名"を記入する
const func1 = (x: number, y: number): number => {
  return x + y;
}

//Intersection Types
type PROFILE = {
  age: number;
  city: string;
}

type LOGIN = {
  username: string;
  password: string;
}

//上記の2つのtypeを結合させるには＆で繋ぐ
type USER = PROFILE & LOGIN;

const userA: USER = {
  age: 25,
  city: 'Saitama',
  username: 'xxx',
  password: 'yyy'
}

//Union Types
//以下のように型定義すると、booleanかnumberしか受け付けない
let value: boolean | number

//配列に対して
let arrayUni: (number | string) [];

/*
*ここまでの疑問点
*・interfaceとtypeの違い
*・
*
*
*
*/

//Literal type
let company: 'Amazon' | 'Facebook';
company = 'Amazon'

//Typeof: 宣言済み変数の型を指定する
//宣言した変数と密になる変数の型を合わせたい時に使える
let msg: string = 'hi';
let msg2: typeof msg;

//keyof
type KEYS = {
  primary: string;
  second: string;
}

//KEYSのキーをユニオンタイプで取り出してくれる
let key: keyof KEYS
key = 'primary'

//typeof + keyof  以下のconst SPORTSの意味はSPORTSという名前のオブジェクトを作りますという意味
const SPORTS = {
  soccer: 'Soccer',
  baseball: 'Baseball'
}

//typeof SPORTSでSPORTSが持っているデータ型を継承
//keyof
let keySports: keyof typeof SPORTS


//Generics
//どういう場合に使うのか:
//以下のコードで作成したGENというclassのTというエイリアスは、型が定まっていない
//テンプレだけ作って、動的に型を決めることができるのがgenerics
interface GEN<T>{
  item: T
}

//Genericsを使う時に、<>の中に使いたい型を指定してあげることで、itemの属性を変えることができる。
const gen0: GEN<string> = {item: 'hello'};
const gen1: GEN<number> = {item: 1};
const gen2: GEN<boolean> = {item: true};

interface GEN2<T extends string | number>{
  item: T
}

const gen4: GEN2<number> = {item: 1}

//関数のGenerics設定
//function名<エイリアス>(引数名: 型名(=エイリアス名))
function funcGen<T>(props: T){
  return {item: props}
}

//自動で型推論してくれる。この場合はstring型
const gen6 = funcGen('test')
const gen7 = funcGen<string | null>(null)

//
function funcGen1<T extends string | null>(props: T){
  return {value: props}
}
const gen8 = funcGen1('hello')

interface Props{
  price: number;
}

//functionで書く
function funcGen2<T extends Props>(props: T){
  return {value: props.price}
}

//アロー関数で書く
const funcGen3 = <T extends Props>(props: T) => {
  return {value: props.price}
}

const gen10 = funcGen2({price: 1});

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
