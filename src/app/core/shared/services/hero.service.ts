import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, delay, finalize, map, catchError, throwError } from "rxjs";
import { Hero } from "../../models/hero.interface";
import { CustomLoaderService } from "./custom-loader.service";


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  private heroesUrl = 'assets/heroes.json';
  private heroesSubject: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  public heroes$: Observable<Hero[]> = this.heroesSubject.asObservable();
  public loader: boolean = false;

  private API_URL: string = "https://catfact.ninja/fact";
  
  constructor(
    private http: HttpClient,
    private loaderService: CustomLoaderService ) { 
  }

  callLoader(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  //#region ENDPOINTS
  getHeroes(): Observable<Hero[]> {
   this.loaderService.show();
    const localStoargeHeores = this.getLocalStorageHeores();
    
    return localStoargeHeores !== null ? 
      of(localStoargeHeores).pipe(delay(1000), finalize(() => {
        this.loaderService.hide();
      })) 
      : this.http.get<Hero[]>(this.heroesUrl).pipe(delay(1000), finalize(() => {
         this.loaderService.hide();
      }));
  }

  getHero(id: number): Observable<Hero | undefined> {
    console.log(typeof(id))
    console.log(id);
    
    this.loaderService.show();
    return this.getHeroes().pipe(
      map(heroes => heroes.find(hero => hero.id === id)),
      finalize(() => {
        this.loaderService.hide();
      })
    )
  }

  addHero(hero: Hero): Observable<Hero[]> {
    this.loaderService.show();
    return this.getHeroes().pipe(
      map(heroes => {
        hero.id = this.generateId(heroes);
        heroes.push(hero);
        this.saveHeroes(heroes);
        return heroes;
      }),
      catchError(error => throwError(()=>error)),
      finalize(() => {
        this.loaderService.hide();
      })
    )
  }

  updateHero(hero: Hero): Observable<Hero[]> {
    this.loaderService.show();
    return this.getHeroes().pipe(
      map(heroes => {
        const index = heroes.findIndex(h => h.id === hero.id);
        if (index !== -1) {
          heroes[index] = hero;
          this.saveHeroes(heroes)
        }
        return heroes;
      }),
      catchError(error => throwError(()=>error)),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }

  deleteHero(id: number): Observable<any> {
    this.loaderService.show();
    return this.getHeroes().pipe(
      map(heroes => {
        const index = heroes.findIndex(h => h.id === id);
        if (index !== -1) {
          console.log(index)
          heroes.splice(index, 1);
          this.saveHeroes(heroes);
          return heroes;
        }else{
          throw new Error("Cannot match any id");
        }
        
      }),
      catchError(error => throwError(()=>error)),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
  //#endregion

  // #region UTILS

  private generateId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id!)) + 1 : 1;
  }
  
  private getLocalStorageHeores() {
    const localStorageData = localStorage.getItem('heroes');
    return localStorageData ? JSON.parse(localStorageData) as Hero[] : null;
  }

  private saveHeroes(heroes: Hero[]){
    localStorage.setItem('heroes', JSON.stringify(heroes));
    this.heroesSubject.next(heroes);
  }
  // #endregion
}

