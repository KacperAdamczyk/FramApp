export class FakeCoolSessionStorege {
  getItem(input: any): string {
    return 'true';
  }
  setItem(name: string, value: string): void {
  }
}
