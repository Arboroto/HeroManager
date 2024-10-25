import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Hero } from '../../../core/models/hero.interface';
import { DefaultModalComponent } from '../../../core/shared/components/default-modal/default-modal.component';
import { HeroService } from '../../../core/shared/services/hero.service';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-create-edit-hero',
  templateUrl: './create-edit-hero.component.html',
  styleUrls: ['./create-edit-hero.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    RouterModule, 
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule 
  ]
})
export class CreateEditHeroComponent {
    public id!: number;

    heroInfo!: Hero;

    heroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = this.router.parseUrl(this.router.url).queryParams['id']
    this.prepareHeroFormInfo();
  }

  prepareHeroFormInfo(){
    this.initForm();
    if(this.id !== undefined){
      this.heroService.getHero(Number(this.id)).subscribe({
        next: (res)=>{
          this.heroInfo = res as Hero;
          this.updateForm();
        }
      }) 
    }
  }

  initForm(){
    this.heroForm = this.fb.group({
      name: [this.heroInfo ? this.heroInfo.name : '', Validators.required],
      real_name: [this.heroInfo ? this.heroInfo.real_name : '', Validators.required],
      gender: [this.heroInfo ? this.heroInfo.gender : '', Validators.required],
      race: [this.heroInfo ? this.heroInfo.race : '', Validators.required],
      birth_date: [this.heroInfo ? this.convertStringToDate(this.heroInfo.birth_date) : '00/00/1990'], // Validators.required
      power: [this.heroInfo ? this.heroInfo.power : '', Validators.required],
      imgUrl: [this.heroInfo ? this.heroInfo.imgUrl : ''],
      description: [this.heroInfo ? this.heroInfo.description : '', Validators.required]
    });
  }

  updateForm(): void {
    this.heroForm.patchValue({
      name: this.heroInfo.name,
      real_name: this.heroInfo.real_name,
      gender: this.heroInfo.gender,
      race: this.heroInfo.race,
      birth_date: this.convertStringToDate(this.heroInfo.birth_date),
      power: this.heroInfo.power,
      imgUrl: this.heroInfo.imgUrl,
      description: this.heroInfo.description
    });
  }

  onSubmit() {
    this.openDialog();
  }

  convertDateToString(date: Date): string {
    return date.toLocaleDateString();
  }

  convertStringToDate(string: string): Date{
    const [day, month, year] = string.split('/').map(Number);
    return new Date(year, month - 1, day); 
  }

  createHero(formValue: any){
    this.heroService.addHero(this.writeHero(formValue)).subscribe(res=>{
      this.router.navigate(['public/explore'])
    })
  }

  updateHero(formValue: any){
    this.heroService.updateHero(this.writeHero(formValue)).subscribe(res=>{
      this.router.navigate(['public/explore'])
    })
  }

  writeHero(formValue: any): Hero{
    const hero: Hero = {
      id: this.heroInfo?.id || undefined,
      name: formValue.get('name').value,
      real_name: formValue.get('real_name').value,
      gender: formValue.get('gender').value,
      race: formValue.get('race').value,
      birth_date: this.convertDateToString(formValue.get('birth_date').value),
      power: formValue.get('power').value,
      imgUrl: formValue.get('imgUrl').value || null,
      description: formValue.get('description').value,  
    }

    return hero;
  }

  openDialog(){
    const dialogRef = this.dialog.open(DefaultModalComponent);
    dialogRef.afterClosed().subscribe(res=>{
      if(this.id !== undefined){
        this.updateHero(this.heroForm);
      }else{
        this.createHero(this.heroForm);
      }
    })
  }
}
